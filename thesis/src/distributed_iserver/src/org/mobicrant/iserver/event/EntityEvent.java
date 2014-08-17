/*
 * @(#)$Id: EntityEvent.java 364 2009-07-21 23:43:37Z D\signerb $
 *
 * Author		:	Beat Signer, signer@inf.ethz.ch
 *
 * Purpose		:   Event fired if an entity is changed.
 *
 * -----------------------------------------------------------------------
 *
 * Revision Information:
 *
 * Date				Who			Reason
 *
 * Jul 25, 2006		bsigner		Initial Release
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




/**
 * Event fired if an entity is changed.
 * @version 1.0 Jul 25, 2006
 * @author Beat Signer, signer@inf.ethz.ch
 */
public class EntityEvent extends IServerEvent {

   public EntityEvent(Entity source) {
      super(source);
   } // EntityEvent


   public Entity getEntity() {
      return (Entity)getSource();
   } // getEntity
   
}
