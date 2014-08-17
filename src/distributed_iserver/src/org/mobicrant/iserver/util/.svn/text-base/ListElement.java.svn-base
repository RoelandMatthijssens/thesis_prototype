package org.mobicrant.iserver.util;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;

import org.mobicrant.iserver.rsl.Entity;


@PersistenceCapable
public class ListElement {
	
	
@Persistent
private Entity el1;

@Persistent
private ListElement el2;

		//*****
		public ListElement(Entity el, ListElement nextElement)
		{
			el1 = el;
			el2 = nextElement;
		}
        //******
		public ListElement(Entity el)
		{
			this(el,null);
		}
        //***********
		
		public Entity first()
		{
			return el1;
		}
        //***********
		public ListElement rest()
		{
			return el2;
		}
        //********
		public void setFirst(Entity value)
		{
			el1 = value;
		}
        //******************
		public void setRest(ListElement value)
		{
			el2 = value;
		}
        //*********
	}   // class ListElement



