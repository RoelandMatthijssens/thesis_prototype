package org.mobicrant.iserver.rsl;


/*
 * TODO 
 * ask Beat: 
 * - difference between getAuthorisedUsers and getAuthorisedUsersFlat ?
 * - wtf is getAuthorisedIndividuals? diff. with users????
 * - ok with HashSets?
 * - implementation of sources()... lost on this one
 * 
 * - getIcon + getTooltip...
 * 
 */


import java.util.HashSet;
import java.util.HashMap;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;
import javax.jdo.annotations.PrimaryKey;
import javax.jdo.annotations.Unique;

import org.mobicrant.iserver.rsl.Schema;
import org.mobicrant.iserver.util.Constant;
import org.mobicrant.iserver.util.Property;


@PersistenceCapable
public class Entity extends AbstractRslElement {

	private static final String TYPE = Schema.TYPE_ENTITY;
	@Unique(name="name_IDX")
	@Persistent
	protected String name = null;
	@Persistent
	protected Individual creator = null;
	@Persistent
	private HashSet<User> authorisedUsers = null;
	@Persistent
	private HashSet<User> unauthorisedUsers = null;
	@Persistent
	private HashMap<String, Property> properties = null;
	
	public Entity(){
		super();
		this.authorisedUsers = new HashSet<User>();
		this.unauthorisedUsers = new HashSet<User>();
		this.properties = new HashMap<String, Property>();
	}
	
	public Entity(String name) {
		this();
		this.name = name;
	}
	
	public Individual getCreator() {
		return creator;
	}

	public void setCreator(Individual creator) {
		this.creator = creator;
	}
	
	public boolean isCreator(Individual creator){
		return getCreator().equals(creator);
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	 public boolean addAuthorisedUser(User user) {
		return authorisedUsers.add(user);
	 }
	 
	 public boolean removeAuthorisedUser(User user) {
		 return authorisedUsers.remove(user);
	 }
	 
	 public HashSet<User> getAuthorisedUsers(){
		 HashSet<User> result = new HashSet<User>();
		 for(User user: authorisedUsers){
			 if(user instanceof User){
				 result.add(user);
			 }else if(user instanceof Group){
				 result.addAll(((Group)user).getMembers());
			 }
		 }
		 return result;
	 }
	 
	 public HashSet<User> getAuthorisedUsersFlat(){
		 HashSet<User> result = new HashSet<User>();
		 for(User user: authorisedUsers){
			 result.add(user);
		 }
		 return result;
	 }
	 
	 public HashSet<?> getAuthorisedIndividuals() {
		 throw new UnsupportedOperationException("not yet implemented.");
		 //TODO  not sure of the difference with getAuthorisedUsers()....
	 }
	 
	 
	 public boolean addUnauthorisedUser(User user) {
		 return unauthorisedUsers.add(user);
	 }

	 public boolean removeUnauthorisedUser(User user) {
		 return unauthorisedUsers.remove(user);
	 }

	 public HashSet<User> getUnauthorisedUsers(){
		 HashSet<User> result = new HashSet<User>();
		 for(User user: unauthorisedUsers){
			 if(user instanceof User){
				 result.add(user);
			 }else if(user instanceof Group){
				 result.addAll(((Group)user).getMembers());
			 }
		 }
		 return result;
	 }

	 public HashSet<User> getDirectUnauthorisedUsers(){
		 HashSet<User> result = new HashSet<User>();
		 for(User user: unauthorisedUsers){
			 result.add(user);
		 }
		 return result;
	 }

	 public HashSet<Property> getProperties(){
		 HashSet<Property> result = new HashSet<Property>();
		 for(Property p : properties.values()){
			 result.add(p);
		 }
		 return result;
	 }
	 
	 public boolean addProperty(Property property){
		 properties.put(property.getKey(), property);
		 return true;		//will always change if no exception before
	 }
	 
	 public Property removeProperty(String key){
		 return properties.remove(key);
	 }
	 
	 public boolean addProperty(String key, String value){
		 removeProperty(key);
		 return addProperty(new Property(key, value));
	 }
	 
	 public Property getProperty(String key){
		 return properties.get(key);
	 }
	 
	 public boolean isAccessibleTo(User user){
		 return(authorisedUsers.contains(user) && !unauthorisedUsers.contains(user));
	 }
	 
	 /**
	    * Returns the string to be used to label this object.
	    * @return string to be used to label this object.
	    */
	   public synchronized String getLabelExtension() {
	      return (getName() != null) ? getName() : Constant.EMPTY_STRING;
	   } // getLabelExtension
	   
	 public HashSet<Link> sources(){
		 //TODO
		 throw new UnsupportedOperationException("not yet implemented - Entity.sources()");
	 }
	 
	 public String getType(){
		 return Type.ENTITY;
	 }
	 
	 @Override
	   public String toString() {
	      return ("["+TYPE+":"+name+"]");
	   } // toString
}

