package org.mobicrant.iserver.rsl;

import java.util.LinkedList;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;

import org.mobicrant.iserver.jersey.IServerJersey;



@PersistenceCapable
public class DocComponent extends Link {
	private static final String TYPE = Schema.TYPE_LINKDcoument;
	
	
	@Persistent
	public LinkedList<Entity> orderSetOfTargets = new LinkedList <Entity>();
	
	/*
	public boolean addTargetC(Entity target) {
		if(!targets.add(target)){	//element already present in HashSet
			targets.remove(target);
			

	
	if(orderSetOfTargets.add(target)) { IServerJersey.logger.info("yes");}
	else{ IServerJersey.logger.info("no");}
	
			targets.add(target);
		}
		return true;
	}
	*/
	
	public LinkedList<Entity> getOrderTargets(){
		
		LinkedList <Entity> result = new LinkedList<Entity>();
		for(Entity e: orderSetOfTargets)
		{
			result.add(e);
		}
		return result;
	     }
	/*
	public boolean removeTarget(Entity target) {
	  orderSetOfTargets.remove(target);
		return targets.remove(target);
	}
	
	

	
	public void insertAfterObject(Entity e1, Entity e2){
	int indx=orderSetOfTargets.indexOf(e2);
	orderSetOfTargets.add(indx+1, e1);
	 targets.add(e1);
	}
	
	public String toString(){
		return ("["+TYPE+":"+getName()+"| content:"+this.getOrderTargets().size()+"]");
	}
	*/

}
