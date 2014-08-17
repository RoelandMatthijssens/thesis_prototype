package org.mobicrant.iserver.rsl;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;

import org.mobicrant.iserver.util.Constant;

/*
 * TODO
 * - getIcon/getTooltip
 */

@PersistenceCapable
public class Layer extends AbstractRslElement {

	private static final String TYPE = Schema.TYPE_LAYER;
	
	@Persistent
	private String name = null;
	@Persistent
	private boolean isActive = false;
	@Persistent
	private int position = 0;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public void setActive(boolean active) {
		this.isActive = active;
	}
	
	public boolean isActive() {
		return isActive;
	}
	
	public void setPosition(int position){
		this.position = position;
	}
	
	public int getPosition(){
		return position;
	}
	
	   /**
	    * Returns the string to be used to label this object.
	    * @return string to be used to label this object.
	    */
	   @Override
	   public synchronized String getLabelExtension() {
	      return (getName() != null) ? getName() : Constant.EMPTY_STRING;
	   } // getLabelExtension


	   /**
	    * Returns the layer's label (description).
	    * @return label (description) of the layer.
	    */
	   public String getLabel() {
	      return getName();
	   } // getLabel
	   
	   @Override
	   public String toString() {
	      return ("["+TYPE+":"+name+"]");
	   } // toString
}
