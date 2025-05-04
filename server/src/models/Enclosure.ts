model Enclosure {
  id          Int      @id @default(autoincrement())
  name        String
  capacity    Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  animals     Animal[]
}