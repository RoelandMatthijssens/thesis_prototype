package org.mobicrant.iserver.rsl;

import java.util.HashSet;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;

import org.mobicrant.iserver.util.Constant;


/*
 * TODO
 * - getIcon / getTooltip
 */
@PersistenceCapable
public class ComplexResource extends Resource {

	
	private static final String TYPE = Schema.TYPE_COMPLEX_RESOURCE;
	
	@Persistent
	private HashSet<Resource> resources = null;
	
	public ComplexResource(){
		super();
		resources = new HashSet<Resource>();
	}
	
	public boolean addResource(Resource resource) {
		if(!resources.add(resource)){	//element already present in HashSet
			resources.remove(resource);
			resources.add(resource);
		}
		return true;
	}
	
	public void removeResource(Resource resource){
		resources.remove(resource);
	}
	
	public HashSet<Resource> getResources(){
		HashSet<Resource> result = new HashSet<Resource>();
		for(Resource s : resources){
			result.add(s);
		}
		return result;
	}
	 /**
	    * Returns the string to be used to label this object.
	    * @return string to be used to label this object.
	    */
	   @Override
	   public synchronized String getLabelExtension() {
	      String prefix = (!super.getLabelExtension().equals(Constant.EMPTY_STRING)) ? super
	            .getLabelExtension()
	            : Schema.TYPE_COMPLEX_RESOURCE;
	      return prefix + Constant.BLANK + Constant.OPEN_PARENTHESIS
	            + getResources().size() + Constant.CLOSE_PARENTHESIS;
	   } // getLabelExtension
	
	/**
	    * Returns a string representation of the group's content.
	    * @return string representation of the group's content.
	    */
	   @Override
	   public String toString() {
		   return ("["+TYPE+":"+getName()+"| size:"+resources.size()+"]");
	   } // toString
}
