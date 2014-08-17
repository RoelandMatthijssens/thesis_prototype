/*
 * @(#)$Id: GroupEvent.java 364 2009-07-21 23:43:37Z D\signerb $
 *
 * Author		:	Beat Signer, signer@inf.ethz.ch
 *
 * Purpose		:   Event fired if a user is added or removed from a group.
 *
 * -----------------------------------------------------------------------
 *
 * Revision Information:
 *
 * Date				Who			Reason
 *
 * Jul 12, 2006		bsigner		Initial Release
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

import org.mobicrant.iserver.rsl.User;




/**
 * Event fired if a user is added or removed from a group.
 * @version 1.0 Jul 12, 2006
 * @author Beat Signer, signer@inf.ethz.ch
 */
public class GroupEvent extends UserEvent {

   private User member;
   
   public GroupEvent(User group, User member) {
      super(group);
      this.member = member;
   } // GroupEvent
   
   /*
    * Returns the member (individual or group) that has been added or removed from the group.
    * @return member (individual or group) that has been added or removed from the group.
    */
   public User getMember() {
      return member;
   }
   
}
