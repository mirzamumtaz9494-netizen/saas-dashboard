import os

path1 = "lib/mock-data/index.ts"
with open(path1, "r", encoding="utf-8") as f:
    content1 = f.read()
    
# Replace the one right after mockDocuments
target1 = """export const mockTemplates = [
  { id: "tpl-1","""
replacement1 = """export const mockDocumentTemplates = [
  { id: "tpl-1","""
content1 = content1.replace(target1, replacement1)
with open(path1, "w", encoding="utf-8") as f:
    f.write(content1)


path2 = "app/dashboard/documents/page.tsx"
with open(path2, "r", encoding="utf-8") as f:
    content2 = f.read()

content2 = content2.replace("mockTemplates,", "mockDocumentTemplates,")
content2 = content2.replace("mockTemplates.map(", "mockDocumentTemplates.map(")

with open(path2, "w", encoding="utf-8") as f:
    f.write(content2)
