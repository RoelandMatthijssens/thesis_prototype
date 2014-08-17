package org.mobicrant.iserver.rsl;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;


/*
 * TODO
 * - in original class, quite a few methods overriding getName/getCreator methods in the Entity class... did not touch override them atm
 * - getResource???
 * - getIcon / getTooltip
 */

@PersistenceCapable
public class Selector extends Entity {
	
	private static final String TYPE = Schema.TYPE_SELECTOR;
	@Persistent
	private Layer layer;
	
	public synchronized void setLayer(Layer layer) {
		this.layer = layer;
	}
	
	public synchronized Layer getLayer() {
		return layer;
	}
	
	
	public Resource getResource() {
		//TODO
		throw new UnsupportedOperationException("not yet implemented - Selector.getResources()");
	}

}
