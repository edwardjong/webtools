package nl.java8.rest;


import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.transaction.Transactional;


@Stateless
@Transactional
public class ItemService {

	@Inject
	private ItemDAO itemDAO;
	
	public void saveItem(Item item) {
		itemDAO.saveItem(item);
	}
	
	public List<Item> getItemList() {
		return itemDAO.getItemList();
	}
	
	public void removeItem(Item item) {
		item.setActive(false);
		itemDAO.saveItem(item);
	}
}