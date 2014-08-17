package org.mobicrant.iserver.rsl;

import javax.jdo.annotations.PersistenceCapable;

import org.mobicrant.iserver.util.Constant;

/*
 * TODO
 * - getIcon / getTooltip?
 */

@PersistenceCapable
public class Individual extends User {

	private static String TYPE = Schema.TYPE_INDIVIDUAL;
	
	private String login = null;
	private String password = null;
	
	
	public synchronized String getLogin() {
		return login;
	}
	
	public synchronized void setLogin(String login) {
		this.login = login;
	}
	
	public synchronized String getPassword() {
		return password;
	}
	
	public synchronized void setPassword(String password) {
		this.password = password;
	}
	
	/**
	    * Returns the string to be used to label this object.
	    * @return string to be used to label this object.
	    */
	   @Override
	   public synchronized String getLabelExtension() {
	      return (!super.getLabelExtension().equals(Constant.EMPTY_STRING)) ? super
	            .getLabelExtension()
	            + Constant.COMMA + Constant.BLANK + getLogin() : getLogin();
	   } // getLabelExtension
}
