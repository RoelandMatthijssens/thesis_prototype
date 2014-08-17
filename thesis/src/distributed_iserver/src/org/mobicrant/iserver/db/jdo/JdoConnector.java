package org.mobicrant.iserver.db.jdo;

import java.util.Collection;
import java.util.Properties;
import java.util.Set;
import java.util.logging.Logger;

import javax.jdo.Extent;
import javax.jdo.JDOException;
import javax.jdo.JDOHelper;
import javax.jdo.PersistenceManager;
import javax.jdo.PersistenceManagerFactory;
import javax.jdo.Query;
import javax.jdo.Transaction;

import org.mobicrant.iserver.db.AbstractDatabaseConnector;
import org.mobicrant.iserver.db.DatabaseManager;
import org.mobicrant.iserver.db.Result;
import org.mobicrant.iserver.rsl.AbstractRslElement;

//AbstractDatabaseConnector implementation for JDO

public class JdoConnector implements AbstractDatabaseConnector {

	private final static Logger logger = Logger.getLogger(DatabaseManager.class
			.getName());
	private PersistenceManagerFactory pmf = null;
	private PersistenceManager pm = null;
	private Transaction tx = null;

	@Override
	public boolean init(Properties properties) {
		pmf = JDOHelper.getPersistenceManagerFactory(properties
				.getProperty("jdo_properties_file"));
		return true;
	}

	@Override
	public boolean create(Set<AbstractRslElement> rslElements) {
		if (rslElements == null) {
			logger.warning("Cannot create into DB set of elements '"
					+ rslElements + "' because it is null");
			return false;
		}
		checkTransactionStatus();

		pm.makePersistentAll(rslElements);

		return true;
	}

	@Override
	public boolean create(AbstractRslElement rslElement) {
		if (rslElement == null) {
			logger.warning("Cannot create into DB element '" + rslElement
					+ "' because it is null");
			return false;
		}
		checkTransactionStatus();

		pm.makePersistent(rslElement);

		return true;
	}

	@Override
	public Result read(String selectQuery) {
		if (selectQuery == null) {
			logger.warning("Cannot execute query '" + selectQuery
					+ "' because it is null");
			return null;
		}
		checkTransactionStatus();
		Result res = null;
		Query query = pm.newQuery(selectQuery);
		Collection<AbstractRslElement> c = (Collection) query.execute();
		res = new Result(c);

		return res;
	}

	@Override
	public Result read(Class<?> classConstraint, String filter) {
		checkTransactionStatus();
		Result res = null;
		Query query = null;
		if (classConstraint != null) {
			query = pm.newQuery(classConstraint);
			if(filter != null && !filter.equals("")){
				query.setFilter(filter);
			}
		} else {
			query = pm.newQuery(filter); // ndBruno : not sure about that one
		}
		// Collection<AbstractRslElement> c=(Collection)query.execute();
		res = new Result((Collection) query.execute());

		return res;
	}

	@Override
	public boolean update(Set<AbstractRslElement> rslElements) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean update(AbstractRslElement rslElement) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean delete(Set<AbstractRslElement> rslElements) {
		if (rslElements == null) {
			logger.warning("Cannot delete set of elements '"
					+ rslElements + "' because it is null");
			return false;
		}
		checkTransactionStatus();

		pm.deletePersistentAll(rslElements);

		return true;
	}

	@Override
	public boolean delete(AbstractRslElement rslElement) {
		if (rslElement == null) {
			logger.warning("Cannot delete element '" + rslElement
					+ "' because it is null");
			return false;
		}
		checkTransactionStatus();

		pm.deletePersistent(rslElement);

		return true;
	}

	@Override
	public boolean resetDb() {
		checkTransactionStatus();
		try {
			Query q = pm.newQuery(AbstractRslElement.class); 
			// as all elements in our db are supposed to inherit from this class...
			@SuppressWarnings("unused")
			long numberInstancesDeleted = q.deletePersistentAll();
			tx.commit();
		} finally {
			if (tx.isActive()) {
				tx.rollback();
			}
			pm.close();
		}
		return true;
	}

	private void checkTransactionStatus() {

		if (tx == null || !tx.isActive()) {
			pm = pmf.getPersistenceManager();
			tx = pm.currentTransaction();
			tx.begin();
		}
	}

	@Override
	public boolean commit() {
		boolean status = true;
		try {
			if (tx != null) {
				tx.commit();
			}
		} catch (Exception e) {
			status = false;
			throw new JDOException("Could not commit transaction " + tx);

		} finally {
			if (tx.isActive()) {
				tx.rollback();
			}
			pm.close();
		}
		return status;
	}

	@Override
	public boolean closeDb() {
		pm.close();
		pmf.close();
		return true;
	}

}
