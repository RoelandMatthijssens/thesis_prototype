/*
 * @(#)$Id: Parameter.java 364 2009-07-21 23:43:37Z D\signerb $
 *
 * Author       :   Beat Signer, signer@inf.ethz.ch
 *
 * Purpose      :   
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


package org.mobicrant.iserver.rsl.old;

import static org.ximtec.iserver.util.Constant.ICON_PATH;

import javax.swing.ImageIcon;

import org.sigtec.graphix.IconTool;
import org.sigtec.util.Decorator;
import org.ximtec.iserver.event.ParameterEvent;


/**
 * @version 1.0, Mar 2005
 * @author Beat Signer, signer@inf.ethz.ch
 */
public class Parameter extends org.sigtec.om.type.Parameter implements Decorator {

   private static final String ICON_NAME = ICON_PATH + "parameter";

   private static final String TOOLTIP = "A parameter (key, value).";


   /**
    * Sets the parameter's name.
    * @param name the parameter's name.
    */
   @Override
   public synchronized void setName(String name) {
      super.setName(name);
      fireUpdateEvent();
   } // setName


   /**
    * Sets the parameter's value.
    * @param value the parameter's value.
    */
   @Override
   public synchronized void setValue(String value) {
      super.setValue(value);
      fireUpdateEvent();
   } // setValue


   /**
    * Returns the parameter's label (description).
    * @return label (description) of the parameter.
    */
   public String getLabel() {
      return getName();
   } // getLabel


   /**
    * Returns an icon for the parameter.
    * @param size the size of the icon to be returned (16, 24 or 32 pixels). Use
    *           the SIZE constants defined in the Decorator interface for
    *           choosing the size.
    * @return icon for the parameter.
    */
   public ImageIcon getIcon(int size) {
      return IconTool.getIcon(ICON_NAME, size);
   } // getIcon


   /**
    * Returns a tooltip for the parameter.
    * @return the parameter's tooltip.
    */
   public String getTooltip() {
      return TOOLTIP;
   } // getTooltip


   private void fireUpdateEvent() {
      IServer.firePreferenceUpdated(new ParameterEvent(this));
   } // fireUpdateEvent

}
