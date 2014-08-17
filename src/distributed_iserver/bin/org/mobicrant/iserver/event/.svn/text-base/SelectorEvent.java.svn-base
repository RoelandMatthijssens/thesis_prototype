/*
 * @(#)$Id: SelectorEvent.java 364 2009-07-21 23:43:37Z D\signerb $
 *
 * Author       :   Beat Signer, signer@inf.ethz.ch
 *
 * Purpose      :   Event fired on create, delete, or update of a
 *                  selector.
 *
 * -----------------------------------------------------------------------
 *
 * Revision Information:
 *
 * Date             Who         Reason
 *
 * Mar 11, 2005     bsigner     Initial Release
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

import org.mobicrant.iserver.rsl.Selector;


/**
 * Event fired on create, delete, or update of a selector.
 * @version 1.0 Mar 2005
 * @author Beat Signer, signer@inf.ethz.ch
 */
public class SelectorEvent extends EntityEvent {

   public SelectorEvent(Selector source) {
      super(source);
   } // SelectorEvent


   public Selector getSelector() {
      return (Selector)getEntity();
   } // getSelector

}
