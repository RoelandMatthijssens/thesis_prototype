package org.mobicrant.iserver.rsl;


import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;

import org.mobicrant.iserver.util.Constant;


/*
 * TODO
 * fireUpdateEvent()
 */

@PersistenceCapable
public class Parameter extends AbstractRslElement {

	private static final String TYPE = Schema.TYPE_PARAMETER;
	
	//@PrimaryKey
	@Persistent
	private String name = null;
	@Persistent
	private String value = null;
	
	public Parameter(String name, String value){
		this.name = name;
		this.value = value;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
		//fireUpdateEvent();
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	//	fireUpdateEvent();
	}
	
	/**
	    * Returns the parameter's label (description).
	    * @return label (description) of the parameter.
	    */
	   public String getLabel() {
	      return getName();
	   } // getLabel
	   
	   /**
	    * Returns the string to be used to label this object.
	    * @return string to be used to label this object.
	    */
	   public synchronized String getLabelExtension() {
	      return (getName() != null) ? getName() : Constant.EMPTY_STRING;
	   } // getLabelExtension

	   
	   private void fireUpdateEvent() {
		   //TODO
		   throw new UnsupportedOperationException("Not yet implemented (Parameter.fireUpdateEvent()");
		      //IServer.firePreferenceUpdated(new ParameterEvent(this));
		   } // fireUpdateEvent
	   
	   @Override
	   public String toString() {
	      return ("["+TYPE+":"+name+"]");
	   } // toString
}
