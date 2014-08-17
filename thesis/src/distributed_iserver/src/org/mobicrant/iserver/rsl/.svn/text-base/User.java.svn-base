package org.mobicrant.iserver.rsl;

import java.util.HashSet;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;
import javax.jdo.annotations.Unique;

import org.mobicrant.iserver.util.Constant;


/*
 * TODO
 * - memberOf() ?
 * - getIcon + getTooltip...
 * 
 */

@PersistenceCapable
public class User extends AbstractRslElement {

	private static final String TYPE = Schema.TYPE_USER;
	
	//@PrimaryKey
	@Unique(name="name_IDX")
	@Persistent
	private String name = null;
	@Persistent
	private String description = null;
	@Persistent
	private HashSet<Parameter> preferences = null;
	
	public User(){
		this.preferences = new HashSet<Parameter>();
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}
	
	public HashSet<Group> memberOf(){
		//TODO
		throw new UnsupportedOperationException("Not yet implemented - User.memberOf()");
	}
	
	public HashSet<Parameter> getPreferences(){
		HashSet<Parameter> result = new HashSet<Parameter>();
		for(Parameter p : preferences){
			result.add(p);
		}
		return result;
	}
	
	public void addPreference(String name, String value){
		this.preferences.add(new Parameter(name, value));
	}
	
	public void addPreference(Parameter p){
		this.preferences.add(p);
	}
	
	public boolean removePreference(String name){
		for(Parameter p : preferences){
			if(p.getName().equals(name)){
				preferences.remove(p);
				return true;
			}
		}
		return false;
	}
	
	public String getPreference(String name){
		Parameter p = getParameter(name);
		if(p != null){
			return p.getValue();
		}
		return null;
	}
	
	public Parameter getParameter(String name){
		for(Parameter p : preferences){
			if(p.getName().equals(name)){
				return p;
			}
		}
		return null;
	}
	
	public synchronized String getLabelExtension() {
	      return (getName() != null) ? getName() : Constant.EMPTY_STRING;
	   } // getLabelExtension
	
	/**
	    * Returns the entity's label (description).
	    * @return label (description) of the entity.
	    */
	   public String getLabel() {
	      return getName();
	   } // getLabel
	   
	   @Override
	   public String toString() {
	      return ("["+TYPE+":"+name+"]");
	   } // toString
}
