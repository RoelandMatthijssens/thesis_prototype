package org.mobicrant.iserver.rsl;

import java.util.HashSet;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;

import org.mobicrant.iserver.util.Constant;


/*
 * TODO
 * - difference between "direct" members and members?
 * - getIcon / getTooltip?
 */

@PersistenceCapable
public class Group extends User {
	private static final String TYPE = Schema.TYPE_GROUP;
	
	@Persistent
	private HashSet<User> members = null;
	
	
	public Group(){
		super();
		members = new HashSet<User>();
	}
	
	public void addMember(User user){
		members.add(user);
	}
	
	public void removeMember(User user){
		members.remove(user);
	}
	
	public HashSet<User> getDirectMembers(){
		return members;
	}
	
	public HashSet<User> getMembers(){
		HashSet<User> result = new HashSet<User>();
		for (User u : members){
			if(u instanceof Group){
				result.addAll(((Group)u).getMembers());
			}else{
				result.add(u);
			}
		}
		return result;
	}
	
	/**
	    * Returns true if the specified user is a direct member of the group (depth
	    * 1).
	    * @param user the user to be checked for.
	    * @return true if the specified user is a direct member of the group
	    */
	   public boolean isDirectMember(User user) {
	      return getDirectMembers().contains(user);
	   } // isDirectMember
	   
	   /**
	    * Returns true is the specified user is a member of the group or any
	    * subgroups (recursive).
	    * @param user the user to be checked for.
	    * @return true if the specified user is a member of the group.
	    */
	   public boolean isMember(User user) {
	      return getMembers().contains(user);
	   } // isMember
	   
	   /**
	    * Returns the string to be used to label this object.
	    * @return string to be used to label this object.
	    */
	   @Override
	   public synchronized String getLabelExtension() {
	      String prefix = (!super.getLabelExtension().equals(Constant.EMPTY_STRING)) ? super
	            .getLabelExtension()
	            : Schema.TYPE_GROUP;
	      return prefix + Constant.BLANK + Constant.OPEN_PARENTHESIS
	            + getMembers().size() + Constant.CLOSE_PARENTHESIS;
	   } // getLabelExtension
	
	   /**
	    * Returns a string representation of the group's content.
	    * @return string representation of the group's content.
	    */
	   @Override
	   public String toString() {
		   return ("["+TYPE+":"+getName()+"| size:"+members.size()+"]");
	   } // toString
}
