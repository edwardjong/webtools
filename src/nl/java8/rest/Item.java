package nl.java8.rest;

import java.io.Serializable;

import javax.ejb.Stateless;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

@Stateless
@Entity
public class Item implements Serializable
{
	private static final long serialVersionUID = 1L;

	@Id
    @SequenceGenerator(name="item_id_seq", sequenceName="item_id_seq", allocationSize=1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="item_id_seq")
	private int id;

	private String itemName;
	private String nameExt;
	private String datum;
	private String developer;
	private String description;
	private String type;
	private String profiel;
	private String plaatje;
	private String doc;
	private Boolean active = Boolean.TRUE;

	public Item()
	{
	}

	public String getItemName()
	{
		return itemName;
	}

	public void setItemName(String itemName)
	{
		this.itemName = itemName;
	}

	public String getNameExt()
	{
		return nameExt;
	}

	public void setNameExt(String nameExt)
	{
		this.nameExt = nameExt;
	}

	public String getPlaatje()
	{
		return plaatje;
	}

	public void setPlaatje(String plaatje)
	{
		this.plaatje = plaatje;
	}

	public String getDatum()
	{
		return datum;
	}

	public void setDatum(String datum)
	{
		this.datum = datum;
	}

	public int getId()
	{
		return id;
	}

	public void setId(int id)
	{
		this.id = id;
	}

	public String getDeveloper()
	{
		return developer;
	}

	public void setDeveloper(String developer)
	{
		this.developer = developer;
	}

	public String getDescription()
	{
		return description;
	}

	public void setDescription(String description)
	{
		this.description = description;
	}

	public String getType()
	{
		return type;
	}

	public void setType(String type)
	{
		this.type = type;
	}

	public String getProfiel()
	{
		return profiel;
	}

	public void setProfiel(String profiel)
	{
		this.profiel = profiel;
	}

	public String getDoc()
	{
		return doc;
	}

	public void setDoc(String doc)
	{
		this.doc = doc;
	}
	
	public boolean getActive()
	{
		return active;
	}

	public void setActive(boolean active)
	{
		this.active = active;
	}
}