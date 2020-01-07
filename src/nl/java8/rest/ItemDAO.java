package nl.java8.rest;


import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class ItemDAO {

	@PersistenceContext
	public EntityManager em;
	
	public void saveItem(Item item) {
		if (item.getId() == 0) {
			em.persist(item);
		} else {
			em.merge(item);
		}
	}
	
	public List<Item> getItemList()
	{
		List<Item> itemList = em.createQuery(
	            "SELECT p FROM Item p where p.active = true ORDER BY id", Item.class).getResultList();
		return itemList;
	}
}