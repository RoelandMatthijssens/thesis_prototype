package org.mobicrant.iserver.db;

import java.util.Properties;
import java.util.Set;

import javax.jdo.Query;

import org.mobicrant.iserver.rsl.AbstractRslElement;

//interface defining all basic operations a DB is supposed to be able to achieve

public interface AbstractDatabaseConnector {

	
	public boolean init(Properties properties);
	public boolean resetDb();
	//CRUD
	public boolean create(Set<AbstractRslElement> rslElements);
	public boolean create(AbstractRslElement rslElement);
	public Result read(String selectQuery);
	public Result read(Class<?> classConstraint, String filter);
	public boolean update(Set<AbstractRslElement> rslElements);
	public boolean update(AbstractRslElement rslElement);
	public boolean delete(Set<AbstractRslElement> rslElements);
	public boolean delete(AbstractRslElement rslElement);
	public boolean commit();
	public boolean closeDb();
		
}
