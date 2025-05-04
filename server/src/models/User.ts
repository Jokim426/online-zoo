model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  animals   Animal[]
}

model Animal {
  id        Int      @id @default(autoincrement())
  name      String
  species   String
  age       Int?
  owner     User     @relation(fields: [ownerId], references: [id])
  ownerId   Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}