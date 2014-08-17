/*
 * @(#)$Id: IServerListener.java 364 2009-07-21 23:43:37Z D\signerb $
 *
 * Author       :   Beat Signer, signer@inf.ethz.ch
 *
 * Purpose      :   Listener interface which has to be implemented for
 *                  handling iServer events.
 *
 * -----------------------------------------------------------------------
 *
 * Revision Information:
 *
 * Date             Who         Reason
 *
 * Mar 11, 2005     bsigner     Initial Release
 * Jul 11, 2006     bsigner     Added new methods
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
 * Listener interface which has to be implemented for handling iServer events.
 * @version 1.0 Mar 2005
 * @author Beat Signer, signer@inf.ethz.ch
 */
public interface IServerListener extends EntityListener, LayerListener,
      LinkListener, PreferenceListener, ResourceListener, SelectorListener,
      UserListener {

}
