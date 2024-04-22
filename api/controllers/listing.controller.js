import Listing from "../models/listing.model.js";

export const test = (req, res) => {
    res.json({ message: 'Hello From Listing Route!' })
}

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
}
export const deleteListing = (req, res) => { }
export const updateListing = (req, res) => { }
export const getListing = (req, res) => { }
export const getListings = (req, res) => { }    