package org.mobicrant.iserver.rsl;

import javax.jdo.annotations.PersistenceCapable;

//superclass of all RSL classes

@PersistenceCapable
public abstract class AbstractRslElement {
	private static final String TYPE = "UNKNOWN";
	
	  public synchronized String getLabelExtension(){
		  return null;
	  }
	  
	  public abstract String getName();
	  public abstract void setName(String name);
	  
}
