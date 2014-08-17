package org.mobicrant.iserver.db.jdo;

import java.util.Properties;
import java.util.Set;
import java.util.logging.Logger;

import javax.jdo.JDOHelper;
import javax.jdo.PersistenceManagerFactory;

import org.mobicrant.iserver.db.AbstractDatabaseConnector;
import org.mobicrant.iserver.db.DatabaseManager;
import org.mobicrant.iserver.db.Result;
import org.mobicrant.iserver.rsl.AbstractRslElement;

public class JdoEnhancedConnector implements AbstractDatabaseConnector {

	private final static Logger logger = Logger.getLogger(DatabaseManager.class.getName());
	private PersistenceManagerFactory pmf = null; 
	
	@Override
	public boolean init(Properties properties) {
		pmf = JDOHelper.getPersistenceManagerFactory(properties.getProperty("jdo_properties_file"));
		return true;
	}

	@Override
	public boolean resetDb() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean create(Set<AbstractRslElement> rslElements) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean create(AbstractRslElement rslElement) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Result read(String selectQuery) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Result read(Class<?> classConstraint, String filter) {
		// TODO Auto-generated method stub
		return null;
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
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean delete(AbstractRslElement rslElement) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean commit() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean closeDb() {
		// TODO Auto-generated method stub
		return false;
	}

}
