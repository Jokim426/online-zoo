model Animal {
  id          String   @id @default(uuid())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  name        String
  species     String
  health      Int      @default(100)
  strength    Int      @default(50)
  age         Int?
  color       String?
  isWild      Boolean  @default(false)
  habitat     String?
  diet        String?
  isEndangered Boolean @default(false)
  customAttributes Json?
}