package org.mobicrant.iserver.db;

import java.util.Properties;
import java.util.Set;
import java.util.logging.Logger;

import javax.jdo.Query;

import org.mobicrant.iserver.db.db4o.Db4oConnector;
import org.mobicrant.iserver.db.db4o.Db4oDefaultProperties;
import org.mobicrant.iserver.db.jdo.JdoConnector;
import org.mobicrant.iserver.db.jdo.JdoDefaultProperties;
import org.mobicrant.iserver.db.jdo.JdoEnhancedConnector;
import org.mobicrant.iserver.rsl.AbstractRslElement;

public class DatabaseManager {
	
	private final static Logger logger = Logger.getLogger(DatabaseManager.class.getName());
	public enum DbSource {Db4o, Jdo, Jdo_Enhanced, no_db /*...*/}
	private static DatabaseManager instance = null;
	private static DbSource currentSource = null;
	
	private AbstractDatabaseConnector database = null;
	
	
	private DatabaseManager(DbSource source, Properties properties) {
		Properties defaultProperties;
		logger.info("Getting connection to db '"+source+"'...");
		if(source == DbSource.Db4o){
			database = new Db4oConnector();
			if(properties == null){
				defaultProperties = Db4oDefaultProperties.getDefaultProperties();
				database.init(defaultProperties);
			}else{
				database.init(properties);
			}
		}else if(source == DbSource.Jdo){
			database = new JdoConnector();
			if(properties == null){
				defaultProperties = JdoDefaultProperties.getDefaultProperties();
				database.init(defaultProperties);
			}else{
				database.init(properties);
			}
		}else if(source == DbSource.Jdo_Enhanced){
			database = new JdoEnhancedConnector();
			if(properties == null){
				defaultProperties = JdoDefaultProperties.getDefaultProperties();
				database.init(defaultProperties);
			}else{
				database.init(properties);
			}
		}else if(source == DbSource.no_db){
			database = new NoDatabaseConnector();
			database.init(properties);
		}else{
			logger.severe("No source selected for DatabaseManager "+source);
		}
		currentSource = source;		
		logger.info("Db '"+source+"' handle ready");
	}

	private DatabaseManager(DbSource source){
		this(source, null);
	}

	public static DatabaseManager getDatabaseManager(DbSource source){
		if(instance == null){
			instance = new DatabaseManager(source);
			return instance;
		}else{
			if(currentSource != source){
				instance = new DatabaseManager(source);
				return instance;
			}else{
				return instance;
			}
		}
	}
	
	public static DatabaseManager getCurrentDatabaseManager(){
		if(instance == null){
			logger.severe("Database is not instantiated - call DatabaseManager.getDatabaseManager(source) before attempting to store or get elements.");
		}
		return instance;
	}
	
	public static DatabaseManager getDatabaseManager(DbSource source, Properties properties){
		if(instance == null){
			instance = new DatabaseManager(source, properties);
			return instance;
		}else{
			if(currentSource != source){
				instance = new DatabaseManager(source, properties);
				return instance;
			}else{
				return instance;
			}
		}
	}

	
	//hooks to operations of databases
	
	//create in db a set of new elements
	public boolean create(Set<AbstractRslElement> rslElements) {
		return database.create(rslElements);
	}
	
	//create in db a new element
	public boolean create(AbstractRslElement rslElement) {
		return database.create(rslElement);
	}

	//fetch a set of elements based on a SQL-like SELECT query (see JDOQL)
	public Result read(String selectQuery) {
		return database.read(selectQuery);
	}
	
	//fetch a set of elements based on a query based on a class constraint + filter (see JDOQL)
	public Result read(Class<?> classConstraint, String filter){
		return database.read(classConstraint, filter);
	}
	
	//update a set of elements
	public boolean update(Set<AbstractRslElement> rslElements) {
		return database.update(rslElements);
	}
	
	//update an element
	public boolean update(AbstractRslElement rslElement) {
		return database.update(rslElement);
	}

	
	//delete a set of elements
	public boolean delete(Set<AbstractRslElement> rslElements) {
		return database.delete(rslElements);
	}

	//delete an element
	public boolean delete(AbstractRslElement rslElement) {
		return database.delete(rslElement);
	}
	
	//reset the db to 0
	public boolean resetDb(){
		return database.resetDb();
	}

	public boolean commit() {
		return database.commit();
		
	}

	public boolean closeDb() {
		return database.closeDb();
	}
}
