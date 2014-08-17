package org.mobicrant.iserver.rsl;

import javax.activation.MimeType;
import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;

import org.mobicrant.iserver.util.Constant;

/*
 * TODO
 * - getIcon / getTooltip
 */

@PersistenceCapable
public class Medium extends Resource {

	private static final String TYPE = Schema.TYPE_MEDIUM;
	
	@Persistent
	private String description = null;
	@Persistent
	private MimeType mimeType = null;


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public MimeType getMimeType() {
		return mimeType;
	}


	public void setMimeType(MimeType mimeType) {
		this.mimeType = mimeType;
	}
	
	/**
	    * Returns the name to be used to label this object.
	    * @return name to be used to label this object.
	    */
	   @Override
	   public synchronized String getLabelExtension() {
	      return (getName() != null) ? getName() : Constant.EMPTY_STRING;
	   } // getLabelExtension


	   /**
	    * Returns the type of the resource.
	    * @return the resource's type.
	    */
	   @Override
	   public String getType() {
	      return Type.MEDIUM;
	   } // getType
	
	   
	   
	public String toString(){
		return ("["+TYPE+":"+getName()+"| description:"+description+"]");
	}
	
}
