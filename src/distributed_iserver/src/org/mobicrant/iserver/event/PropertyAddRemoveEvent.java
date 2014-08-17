/*
 * @(#)$Id: PropertyAddRemoveEvent.java 364 2009-07-21 23:43:37Z D\signerb $
 *
 * Author       :   Beat Signer, signer@inf.ethz.ch
 *
 * Purpose      :   Event fired if a property is added or removed from
 *                  an entity.
 *
 * -----------------------------------------------------------------------
 *
 * Revision Information:
 *
 * Date             Who         Reason
 *
 * Jul 25, 2006     bsigner     Initial Release
 *
 * -----------------------------------------------------------------------
 *
 * Copyright 1999-2009 ETH Zurich. All Rights Reserved.
 *
 * This software is the proprietary information of ETH Zurich.
 * Use is subject to license terms.
 * 
 */


package org.mobicrant.iserver.event;

import org.mobicrant.iserver.rsl.Entity;
import org.mobicrant.iserver.util.Property;




/**
 * Event fired if a property is added or removed from an entity.
 * @version 1.0 Jul 25, 2006
 * @author Beat Signer, signer@inf.ethz.ch
 */
public class PropertyAddRemoveEvent extends EntityEvent {

   private Property property;
   
   public PropertyAddRemoveEvent(Entity entity, Property property) {
      super(entity);
      this.property = property;
   } // PropertyAddRemoveEvent
   
   /*
    * Returns the property that has been added or removed from the user.
    * @return property that has been added or removed from the user.
    */
   public Property getProperty() {
      return property;
   } // getProperty
   
}

