/*
 * @(#)$Id: Selector.java 364 2009-07-21 23:43:37Z D\signerb $
 *
 * Author       :   Beat Signer, signer@inf.ethz.ch
 *
 * Purpose      :   Selector used to address parts of a resource.
 *
 * -----------------------------------------------------------------------
 *
 * Revision Information:
 *
 * Date             Who         Reason
 *
 * Dec 19, 2002     bsigner     Initial Release
 * Dec 22, 2003     bsigner     New associated EntityType
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
import org.xdatabase.om.OMAssociation;
import org.ximtec.iserver.event.SelectorEvent;
import org.ximtec.iserver.util.Property;


/**
 * Selector used to address parts of a resource.
 * @version 1.0 Dec 2002
 * @author Beat Signer, signer@inf.ethz.ch
 */
public class Selector extends Entity {

   private static final String ICON_NAME = ICON_PATH + "selector";

   private static final String TOOLTIP = "A selector.";


   @Override
   public synchronized void setName(String name) {
      super.setName(name);
      IServer.fireSelectorUpdated(new SelectorEvent(this));
   } // setName


   @Override
   public synchronized void setCreator(Individual individual) {
      super.setCreator(individual);
      IServer.fireSelectorUpdated(new SelectorEvent(this));
   } // setCreator


   @Override
   public boolean addAuthorisedUser(User user) {
      boolean result = super.addAuthorisedUser(user);
      IServer.fireSelectorUpdated(new SelectorEvent(this));
      return result;
   } // addAuthorisedUser


   @Override
   public boolean removeAuthorisedUser(User user) {
      boolean result = super.removeAuthorisedUser(user);
      IServer.fireSelectorUpdated(new SelectorEvent(this));
      return result;
   } // removeAuthorisedUser


   @Override
   public boolean addUnauthorisedUser(User user) {
      boolean result = super.addUnauthorisedUser(user);
      IServer.fireSelectorUpdated(new SelectorEvent(this));
      return result;
   } // addUnauthorisedUser


   @Override
   public boolean removeUnauthorisedUser(User user) {
      boolean result = super.removeUnauthorisedUser(user);
      IServer.fireSelectorUpdated(new SelectorEvent(this));
      return result;
   } // removeUnauthorisedUser


   public boolean addPropertyOld(String key, String value) {
      boolean result = super.addProperty(key, value);
      IServer.fireSelectorUpdated(new SelectorEvent(this));
      return result;
   } // addProperty


   @Override
   public boolean addProperty(Property property) {
      boolean result = super.addProperty(property);
      IServer.fireSelectorUpdated(new SelectorEvent(this));
      return result;
   } // addProperty


   @Override
   public boolean removeProperty(String key) {
      boolean result = super.removeProperty(key);
      IServer.fireSelectorUpdated(new SelectorEvent(this));
      return result;
   } // removeProperty


   /**
    * Sets the selector's layer and removes all old layers. The layering defines
    * the precedence order (higher layer -> higher priority).
    * @param layer the selector's layer.
    */
   public synchronized void setLayer(Layer layer) {
      OMAssociation onLayer = IServer.associationOnLayer();
      onLayer.remove(new Object[] { this, null });
      onLayer.add(this, layer);
      IServer.fireSelectorUpdated(new SelectorEvent(this));
   } // setLayer


   /**
    * Returns the selector's layer.
    * @return the selector's layer.
    */
   public synchronized Layer getLayer() {
      return (Layer)IServer.associationOnLayer().dr(this).range()
            .getFirstInstance();
   } // getLayer


   /**
    * Returns the resource the selector is bound to.
    * @return the resource the selector is bound to.
    */
   public Resource getResource() {
      return (Resource)IServer.associationRefersTo().dr(this).range()
            .getFirstInstance();
   } // getResource


   /**
    * Returns an icon for the selector.
    * @param size the size of the icon to be returned (16, 24 or 32 pixels). Use
    *           the SIZE constants defined in the Decorator interface for
    *           choosing the size.
    * @return icon for the selector.
    */
   @Override
   public ImageIcon getIcon(int size) {
      return IconTool.getIcon(ICON_NAME, size);
   } // getIcon


   /**
    * Returns a tooltip for the selector.
    * @return the selector's tooltip.
    */
   @Override
   public String getTooltip() {
      return TOOLTIP;
   } // getTooltip

}