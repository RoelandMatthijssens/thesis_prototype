package org.mobicrant.iserver.rsl;

import java.nio.charset.Charset;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;


/*
 * TODO
 * - getIcon / getTooltip
 */

@PersistenceCapable
public class TextComp extends Resource {
	private static final String TYPE = Schema.TYPE_TEXT_COMP;
	
	@Persistent
	private String content = null;
	@Persistent
	private String encoding = "UTF-8";

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
	public String getEncoding() {
		return encoding;
	}

	public void setEncoding(String encoding) {
		if (Charset.isSupported(encoding)){
			this.encoding = encoding;
		}else{
			Logger.getLogger(TextComp.class.getName()).log(Level.WARNING,"Encoding '"+encoding+"' is not supported on this system; keeping '"+this.encoding+"' encoding.");
		}
	}

	public String toString(){
		return ("["+TYPE+":"+getName()+"| content:"+content+"]");
	}
}
