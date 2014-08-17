/*
 * @(#)$Id: LinkListener.java 364 2009-07-21 23:43:37Z D\signerb $
 *
 * Author		:	Beat Signer, signer@inf.ethz.ch
 *
 * Purpose		:   Listener interface to handle link-specific events.
 *
 * -----------------------------------------------------------------------
 *
 * Revision Information:
 *
 * Date				Who			Reason
 *
 * Feb 20, 2006	    bsigner		Initial Release
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
 * Listener interface to handle link-specific events.
 * @version 1.0 Feb 20, 2006
 * @author Beat Signer, signer@inf.ethz.ch
 */
public interface LinkListener extends EntityListener {

   void linkCreated(LinkEvent e);


   void linkInitialised(LinkEvent e);


   void linkUpdated(LinkEvent e);


   void linkDeleted(LinkEvent e);

}
