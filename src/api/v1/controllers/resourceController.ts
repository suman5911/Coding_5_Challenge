import { Request, Response, NextFunction } from "express";
import * as resourceService from "../services/resourceService";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * GET /api/v1/resources
 * Fetches all available resources and returns the total count
 */
export const getAllResources = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const resources = resourceService.getAllResources();
        res.status(HTTP_STATUS.OK).json({
            message: "Resources retrieved",
            count: resources.length,
            data: resources,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * GET /api/v1/resources/:id
 * Retrieves a specific resource using its identifier
 */
export const getResourceById = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const id = parseInt(req.params.id);
        const resource = resourceService.getResourceById(id);

        if (!resource) {
            res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Resource not found" });
            return;
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Resource retrieved",
            data: resource,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * POST /api/v1/resources
 * Adds a new resource to the system
 */
export const createResource = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const { title, type, url, description } = req.body;

        // Validate required fields
        if (!title) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Missing required field: title",
            });
            return;
        }
        if (!type) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Missing required field: type",
            });
            return;
        }
        if (!url) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Missing required field: url",
            });
            return;
        }

        const newResource = resourceService.createResource({
            title,
            type,
            url,
            description: description || "",
        });

        res.status(HTTP_STATUS.CREATED).json({
            message: "Resource created",
            data: newResource,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * PUT /api/v1/resources/:id
 * Modifies an existing resource by ID
 */
export const updateResource = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const id = parseInt(req.params.id);
        const updated = resourceService.updateResource(id, req.body);

        if (!updated) {
            res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Resource not found" });
            return;
        }

        res.status(HTTP_STATUS.OK).json({
            message: "Resource updated",
            data: updated,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * DELETE /api/v1/resources/:id
 * Removes a resource from the system
 */
export const deleteResource = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    try {
        const id = parseInt(req.params.id);
        const deleted = resourceService.deleteResource(id);

        if (!deleted) {
            res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Resource not found" });
            return;
        }

        res.status(HTTP_STATUS.OK).json({ message: "Resource deleted" });
    } catch (error) {
        next(error);
    }
};