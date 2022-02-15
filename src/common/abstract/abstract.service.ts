import { Injectable } from '@nestjs/common';
import { DeepPartial, DeleteResult, Repository } from 'typeorm';
import { IDefaultOptions, IGetMetaProps } from '../paginate-result.interface';
import { IMeta, IPaginateResult } from '../paginate-result.interface';

@Injectable()
export class AbstractService<T> {
  protected constructor(protected readonly repository: Repository<T>) {}

  private DEFAULTOPTIONS: IDefaultOptions = { limit: 20, page: 1 };

  private getMeta({ total, data, limit, page }: IGetMetaProps): IMeta {
    let meta: Partial<IMeta> = { totalItems: total, count: data?.length };
    meta = { ...meta, itemsPerPage: limit, currentPage: page };
    meta = { ...meta, totalPages: Math.ceil(total / limit) };
    return meta as IMeta;
  }

  async findAll(
    relations = [],
    options = this.DEFAULTOPTIONS,
  ): Promise<IPaginateResult<T[]>> {
    let { limit = 20, page = 1 } = options;
    const query = { relations, take: limit, skip: (page - 1) * limit };
    const [data, total] = await this.repository.findAndCount(query);
    const meta = this.getMeta({ total, data, limit, page });
    return { data, meta };
    // return await this.repository.find({ relations });
  }

  async find(
    condition,
    options = this.DEFAULTOPTIONS,
  ): Promise<IPaginateResult<T[]>> {
    let { limit = 20, page = 1 } = options;
    const query = { ...condition, take: limit, skip: (page - 1) * limit };
    const [data, total] = await this.repository.findAndCount(query);
    const meta = this.getMeta({ total, data, limit, page });
    return { data, meta };
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const newRecord = this.repository.create(data);
    return await this.repository.save(newRecord);
  }

  async createMany(data: DeepPartial<T>[]): Promise<T[]> {
    const newRecords = this.repository.create(data);
    return await this.repository.save(newRecords);
  }

  async findOne(condition, relations = []): Promise<T> {
    return await this.repository.findOne(condition, { relations });
  }

  async update(id: string, data: DeepPartial<T>): Promise<T> {
    const exists = await this.repository.findOne(id);
    if (!exists) throw new Error('Record does not exist');
    return await this.repository.save({ id, ...data });
  }

  async updateWhere(condition, data: T): Promise<T> {
    const exists = await this.repository.findOne(condition);
    if (!exists) throw new Error('Record does not exist');
    return await this.repository.save({ ...data });
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  async deleteWhere(condition): Promise<DeleteResult> {
    return this.repository.delete(condition);
  }
}
