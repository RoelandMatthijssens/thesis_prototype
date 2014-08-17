/*
 * @(#)$Id: ParameterAddRemoveEvent.java 364 2009-07-21 23:43:37Z D\signerb $
 *
 * Author       :   Beat Signer, signer@inf.ethz.ch
 *
 * Purpose      :   Event fired if a parameter is added or removed from
 *                  a user.
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

import org.mobicrant.iserver.rsl.Parameter;
import org.mobicrant.iserver.rsl.User;


/**
 * Event fired if a parameter is added or removed from a user.
 * @version 1.0 Jul 25, 2006
 * @author Beat Signer, signer@inf.ethz.ch
 */
public class ParameterAddRemoveEvent extends UserEvent {

   private Parameter parameter;


   public ParameterAddRemoveEvent(User user, Parameter parameter) {
      super(user);
      this.parameter = parameter;
   } // ParameterAddRemoveEvent


   /**
    * Returns the parameter that has been added or removed from the user.
    * @return parameter that has been added or removed from the user.
    */
   public Parameter getParameter() {
      return parameter;
   } // getParameter

}
