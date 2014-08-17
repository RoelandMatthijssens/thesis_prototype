/*
 * @(#)$Id: UserListener.java 364 2009-07-21 23:43:37Z D\signerb $
 *
 * Author		:	Beat Signer, signer@inf.ethz.ch
 *
 * Purpose		:   Listener interface to handle user-specific events.
 *
 * -----------------------------------------------------------------------
 *
 * Revision Information:
 *
 * Date				Who			Reason
 *
 * Feb 20, 2006		bsigner		Initial Release
 * Jul 11, 2006     bsigner     Added additional methods
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

/**
 * Listener interface to handle user-specific events.
 * @version 1.0 Feb 20, 2006
 * @author Beat Signer, signer@inf.ethz.ch
 */
public interface UserListener {

   void userCreated(UserEvent e);


   void userInitialised(UserEvent e);


   void userUpdated(UserEvent e);


   void userDeleted(UserEvent e);

   
   void memberAdded(GroupEvent e);
   
   
   void memberRemoved(GroupEvent e);
   
   
   void preferenceAdded(ParameterAddRemoveEvent e);
   
   
   void preferenceRemoved(ParameterAddRemoveEvent e); 
   
}
