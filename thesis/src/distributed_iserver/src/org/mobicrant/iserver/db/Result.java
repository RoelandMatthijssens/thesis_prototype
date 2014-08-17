package org.mobicrant.iserver.db;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

import org.mobicrant.iserver.rsl.AbstractRslElement;
import org.mobicrant.iserver.rsl.User;


public class Result {

	private Collection<AbstractRslElement> res = null;
	
	public Result(Collection<AbstractRslElement> results) {
		this.res = results;
		if (res == null){
			res = new ArrayList<AbstractRslElement>();
		}
	}

	public void setResults(Collection<AbstractRslElement> results) {
		this.res = results;
		if (res == null){
			res = new ArrayList<AbstractRslElement>();
		}
	}
	
	public Collection<AbstractRslElement> getResults(){
		return res;
	}

	public AbstractRslElement getFirst() {
		if(res == null || res.size() == 0){
			return null;
		}else{
			Iterator<AbstractRslElement> iter=res.iterator();
			return iter.next();
		}
	}
}
