import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private readonly config: ConfigService) {
    // 1. Initialize the PostgreSQL Connection Pool
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const pool = new Pool({
      connectionString: config.get<string>('DATABASE_URL'),
    });

    // 2. Create the Driver Adapter

    const adapter = new PrismaPg(pool);

    // 3. Pass the adapter to the parent PrismaClient constructor

    super({ adapter });
  }

  // Connect when the NestJS module starts
  async onModuleInit() {
    await this.$connect();
  }

  // Disconnect when the app shuts down to prevent memory leaks
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
