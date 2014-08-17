/*
 * @(#)$Id: UserAddRemoveEvent.java 364 2009-07-21 23:43:37Z D\signerb $
 *
 * Author       :   Beat Signer, signer@inf.ethz.ch
 *
 * Purpose      :   Event fired if a user is added or removed from
 *                  an entity.
 *
 * -----------------------------------------------------------------------
 *
 * Revision Information:
 *
 * Date             Who         Reason
 *
 * Jul 12, 2006     bsigner     Initial Release
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
import org.mobicrant.iserver.rsl.User;


/**
 * Event fired if a user is added or removed from an entity.
 * @version 1.0 Jul 25, 2006
 * @author Beat Signer, signer@inf.ethz.ch
 */
public class UserAddRemoveEvent extends EntityEvent {

   private User user;


   public UserAddRemoveEvent(Entity entity, User user) {
      super(entity);
      this.user = user;
   } // UserAddRemoveEvent


   /**
    * Returns the user that has been added or removed from the entity.
    * @return user that has been added or removed from the entity.
    */
   public User getUser() {
      return user;
   } // getUser

}
