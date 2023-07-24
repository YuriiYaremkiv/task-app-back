import { RequestTaskDto } from '../task/dto/req.task.dto';

interface ProcessedPaginationParams {
  skip: number;
  limit: number;
}

export const paginationParams = (
  query: RequestTaskDto,
): ProcessedPaginationParams => {
  const { page = 1, limit = 10 } = query;
  const parsedLimit = limit > 15 || limit < 0 ? 15 : limit;
  const skip = (page - 1) * parsedLimit;

  return { skip, limit: parsedLimit };
};
