package org.mobicrant.iserver.rsl;

import java.util.HashSet;
import java.util.LinkedList;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;

import org.mobicrant.iserver.rsl.Entity;
import org.mobicrant.iserver.util.Constant;

/*
 * TODO
 * - in original class, quite a few methods overriding getName/getCreator methods in the Entity class... did not touch override them atm
 * - getLinkBySource() should be in IServer, imo
 * - same with getLinkByTarget()
 * - getIcon / getTooltip
 */


@PersistenceCapable
public class Link extends Entity {
	private static final String TYPE = Schema.TYPE_LINK;
	
	@Persistent
	protected HashSet<Entity> sources = null;
	@Persistent
	protected HashSet<Entity> targets = null;


	
	public Link(){
		sources = new HashSet<Entity>();
		targets = new HashSet<Entity>();
			}
	
	public boolean addSource(Entity source) {
		if(!sources.add(source)){	//element already present in HashSet
			sources.remove(source);
			sources.add(source);
		}
		return true;
	}
	
	public boolean removeSource(Entity source) {
		return sources.remove(source);
	}
	
	
	public HashSet<Entity> getSource() {
		HashSet<Entity> result = new HashSet<Entity>();
		for(Entity e : sources){
			result.add(e);
		}
		return result;
	}
	
	public boolean addTarget(Entity target) {
		if(!targets.add(target)){	//element already present in HashSet
			targets.remove(target);
			targets.add(target);
		}
		return true;
	}
	
	public boolean removeTarget(Entity target) {
		return targets.remove(target);
	}
	
	
	public HashSet<Entity> getTarget() {
		HashSet<Entity> result = new HashSet<Entity>();
		for(Entity e : targets){
			result.add(e);
		}
		return result;
	}
	
	@Deprecated
	public static HashSet<Entity> getLinkBySource(Entity source) {
		return null;
	}
	
	@Deprecated
	public static HashSet<Entity> getLinkByTarget(Entity target) {
		return null;
	}
	
	public String getType(){
		 return Type.LINK;
	 }
	
	   /**
	    * Returns the string to be used to label this object.
	    * @return string to be used to label this object.
	    */
	   @Override
	   public synchronized String getLabelExtension() {
	      int sourceSize = (getSource() != null) ? 1 : 0;
	      int targetSize = (getTarget() != null) ? getTarget().size() : 0;
	      String prefix = (!super.getLabelExtension().equals(Constant.EMPTY_STRING)) ? super
	            .getLabelExtension()
	            : Schema.TYPE_LINK;
	      return prefix + Constant.BLANK + Constant.OPEN_PARENTHESIS + sourceSize
	            + Constant.COMMA + Constant.BLANK + targetSize
	            + Constant.CLOSE_PARENTHESIS;
	   } // getLabelExtension
	   
	   @Override
	   public String toString() {
	      int sourceSize = (getSource() != null) ? getSource().size() : 0;
	      int targetSize = (getTarget() != null) ? getTarget().size() : 0;
	      return ("["+TYPE+":"+getName()+"| sources: "+sources.size()+"| targets: "+targets.size()+"]");
	   } // toString
}
