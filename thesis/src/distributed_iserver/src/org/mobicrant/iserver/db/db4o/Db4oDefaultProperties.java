package org.mobicrant.iserver.db.db4o;

import java.util.Properties;


public class Db4oDefaultProperties {

	
	final static String DB4O_FILENAME = System.getProperty("user.dir") + System.getProperty("file.separator") + "iserver.db4o";
	
	
	
	////////////
	private static Properties defaultProperties;
	
	static{
		defaultProperties = new Properties();
		defaultProperties.put("path", DB4O_FILENAME);
	}

	public static Properties getDefaultProperties() {
		return defaultProperties;
	}
}
