/*
 * @(#)$Id: Layer.java 364 2009-07-21 23:43:37Z D\signerb $
 *
 * Author       :   Beat Signer, signer@inf.ethz.ch
 *
 * Purpose      :   Layer used to handle overlapping selectors.
 *
 * -----------------------------------------------------------------------
 *
 * Revision Information:
 *
 * Date             Who         Reason
 *
 * Dec 19, 2002     bsigner     Initial Release
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
import org.sigtec.util.Constant;
import org.sigtec.util.Decorator;
import org.sigtec.util.InstanceInfo;
import org.xdatabase.om.workspace.OMSInstance;
import org.ximtec.iserver.event.LayerEvent;


/**
 * Layer used to handle overlapping selectors.
 * @version 1.0 Dec 2002
 * @author Beat Signer, signer@inf.ethz.ch
 */
public class Layer extends OMSInstance implements Decorator {

   private static final String ICON_NAME = ICON_PATH + "layer";

   private static final String TOOLTIP = "Overlapping selectors have to be placed on different layers.";


   /**
    * Sets the name of the layer.
    * @param name the layer's name.
    */
   public synchronized void setName(String name) {
      this.setAttributeValue(Schema.LAYER_NAME, name, false);
      IServer.fireLayerUpdated(new LayerEvent(this));
   } // setName


   /**
    * Returns the layer's name.
    * @return the layer's name.
    */
   public synchronized String getName() {
      return (String)this.getAttributeValue(Schema.LAYER_NAME, false);
   } // getName


   /**
    * Sets a layer active or inactive.
    * @param active true if the layer has to be set active, false otherwise.
    */
   public void setActive(boolean active) {
      if (active) {
         IServer.collectionActiveLayers().add(this);
      }
      else {
         IServer.collectionActiveLayers().remove(this);
      }

   } // setActive


   /**
    * Returns the status (active/inactive) of the layer
    * @return the layer's status (true if active, false otherwise).
    */
   public boolean isActive() {
      return IServer.collectionActiveLayers().contains(this.getBaseObject());
   } // isActive


   /**
    * Moves a layer to a specific position.
    * @param position the position the layer has to be moved to.
    */
   public void setPosition(int position) {
      IServer.collectionLayers().remove(this);
      IServer.collectionLayers().add(position, this.getBaseObject());
      IServer.fireLayerMoved(new LayerEvent(this));
   } // setPosition


   /**
    * Returns the layer's current position.
    * @return the current position of the layer.
    */
   public int getPosition() {
      return IServer.collectionLayers().indexOf(this.getBaseObject());
   } // getPosition


   /**
    * Returns the string to be used to label this object.
    * @return string to be used to label this object.
    */
   @Override
   public synchronized String getLabelExtension() {
      return (getName() != null) ? getName() : Constant.EMPTY_STRING;
   } // getLabelExtension


   /**
    * Returns the layer's label (description).
    * @return label (description) of the layer.
    */
   public String getLabel() {
      return getName();
   } // getLabel


   /**
    * Returns an icon for the layer.
    * @param size the size of the icon to be returned (16, 24 or 32 pixels). Use
    *           the SIZE constants defined in the Decorator interface for
    *           choosing the size.
    * @return icon for the layer.
    */
   public ImageIcon getIcon(int size) {
      return IconTool.getIcon(ICON_NAME, size);
   } // getIcon


   /**
    * Returns a tooltip for the layer.
    * @return the layer's tooltip.
    */
   public String getTooltip() {
      return TOOLTIP;
   } // getTooltip


   /**
    * Returns a string representation of the layer's content.
    * @return string representation of the layer's content.
    */
   @Override
   public String toString() {
      InstanceInfo info = new InstanceInfo(this);
      info.addAttribute(Schema.LAYER_NAME, getName());
      return info.toString();
   } // toString

}