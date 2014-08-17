package org.mobicrant.iserver.rsl;

import java.util.HashSet;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;

import org.mobicrant.iserver.rsl.resource.Template;


/*
 * TODO
 * - Resource.getSelectors(minLayer, maxLayer)
 * - getIcon / getTooltip
 * - in original class, getname/setname/getcreator etc. were overriden. Didn't care about those.
 */


@PersistenceCapable
public class Resource extends Entity {
	private static final String TYPE = Schema.TYPE_RESOURCE;
	
	@Persistent
	private HashSet<Selector> selectors = null;
	@Persistent
	private HashSet<Template> templates = null;
 	
	public Resource(){
		super();
		selectors = new HashSet<Selector>();
		templates = new HashSet<Template>();
	}
	
	public boolean addSelector(Selector selector) {
		if(!selectors.add(selector)){	//element already present in HashSet
			selectors.remove(selector);
			selectors.add(selector);
		}
		return true;
	}
	
	public void removeSelector(Selector selector){
		selectors.remove(selector);
	}
	
	public HashSet<Selector> getSelectors(){
		HashSet<Selector> result = new HashSet<Selector>();
		for(Selector s : selectors){
			result.add(s);
		}
		return result;
	}
	
	public HashSet<Selector> getSelectors(Layer minLayer, Layer maxLayer) {
		//TODO - no idea what these layers refer to...
		throw new UnsupportedOperationException("to be implemented - Resource.getSelectors(minLayer, maxLayer)");
	}
	
	public boolean addTemplate(Template template) {
		if(!templates.add(template)){	//element already present in HashSet
			templates.remove(template);
			templates.add(template);
		}
		return true;
	}
	
	public void removeTemplate(Template template) {
		templates.remove(template);
	}
	
	public HashSet<Template> getTemplates() {
		HashSet<Template> result = new HashSet<Template>();
		for(Template t : templates){
			result.add(t);
		}
		return result;
	}
	
	public String getType(){
		 return Type.RESOURCE;
	 }
	
	public boolean isPlugin() {
	   return false;
	} // isPlugin
	
	@Override
	   public String toString() {
	      return ("["+TYPE+":"+name+"]");
	   } // toString
}
