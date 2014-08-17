package org.mobicrant.iserver.db.jdo;

import java.util.Properties;

public class JdoDefaultProperties {

	
////////////
private static Properties defaultProperties;

static{
	defaultProperties = new Properties();
	defaultProperties.put("jdo_properties_file", "datanucleus_db4o.properties");
	
	//add here properties in the form defaultProperties.put("key", value)
}

public static Properties getDefaultProperties() {
	return defaultProperties;
}
}
