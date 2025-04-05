"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GripVertical, Plus, Save, Trash } from "lucide-react";

// Mock data for offboarding checklist items
const initialChecklist = [
  {
    id: "1",
    category: "Account Access",
    items: [
      { id: "1-1", text: "Disable Okta account", required: true },
      { id: "1-2", text: "Remove from all Okta groups", required: true },
      { id: "1-3", text: "Deactivate Slack account", required: true },
      { id: "1-4", text: "Suspend Google Workspace account", required: true },
      { id: "1-5", text: "Remove from distribution lists", required: false },
    ],
  },
  {
    id: "2",
    category: "Data & Equipment",
    items: [
      { id: "2-1", text: "Backup user data", required: true },
      { id: "2-2", text: "Transfer ownership of documents", required: true },
      { id: "2-3", text: "Collect laptop and accessories", required: true },
      { id: "2-4", text: "Collect security badges", required: true },
      { id: "2-5", text: "Collect company credit cards", required: false },
    ],
  },
  {
    id: "3",
    category: "HR & Administration",
    items: [
      { id: "3-1", text: "Exit interview", required: true },
      { id: "3-2", text: "Final paycheck processing", required: true },
      { id: "3-3", text: "Benefits termination", required: true },
      { id: "3-4", text: "Remove from org chart", required: false },
      { id: "3-5", text: "Update team documentation", required: false },
    ],
  },
  {
    id: "4",
    category: "Communication",
    items: [
      { id: "4-1", text: "Notify team members", required: true },
      { id: "4-2", text: "Notify relevant clients", required: false },
      { id: "4-3", text: "Update automated email responses", required: true },
      { id: "4-4", text: "Knowledge transfer sessions", required: false },
    ],
  },
];

export function OffboardChecklist() {
  const [checklist, setChecklist] = useState(initialChecklist);
  const [newCategory, setNewCategory] = useState("");
  const [newItemText, setNewItemText] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("");
  const [newItemRequired, setNewItemRequired] = useState(false);
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    
    // If dragging categories
    if (source.droppableId === "categories" && destination.droppableId === "categories") {
      const reorderedChecklist = Array.from(checklist);
      const [removed] = reorderedChecklist.splice(source.index, 1);
      reorderedChecklist.splice(destination.index, 0, removed);
      setChecklist(reorderedChecklist);
      return;
    }
    
    // If dragging items within the same category
    if (source.droppableId === destination.droppableId) {
      const categoryIndex = checklist.findIndex(cat => cat.id === source.droppableId);
      const newItems = Array.from(checklist[categoryIndex].items);
      const [removed] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, removed);
      
      const newChecklist = [...checklist];
      newChecklist[categoryIndex] = {
        ...checklist[categoryIndex],
        items: newItems,
      };
      
      setChecklist(newChecklist);
    } else {
      // If dragging items between categories
      const sourceCategoryIndex = checklist.findIndex(cat => cat.id === source.droppableId);
      const destCategoryIndex = checklist.findIndex(cat => cat.id === destination.droppableId);
      
      const sourceItems = Array.from(checklist[sourceCategoryIndex].items);
      const destItems = Array.from(checklist[destCategoryIndex].items);
      
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      
      const newChecklist = [...checklist];
      newChecklist[sourceCategoryIndex] = {
        ...checklist[sourceCategoryIndex],
        items: sourceItems,
      };
      newChecklist[destCategoryIndex] = {
        ...checklist[destCategoryIndex],
        items: destItems,
      };
      
      setChecklist(newChecklist);
    }
  };
  
  const addCategory = () => {
    if (!newCategory.trim()) return;
    
    const newId = `${checklist.length + 1}`;
    setChecklist([
      ...checklist,
      {
        id: newId,
        category: newCategory,
        items: [],
      },
    ]);
    setNewCategory("");
  };
  
  const addItem = () => {
    if (!newItemText.trim() || !newItemCategory) return;
    
    const categoryIndex = checklist.findIndex(cat => cat.id === newItemCategory);
    if (categoryIndex === -1) return;
    
    const newId = `${newItemCategory}-${checklist[categoryIndex].items.length + 1}`;
    const newChecklist = [...checklist];
    newChecklist[categoryIndex].items.push({
      id: newId,
      text: newItemText,
      required: newItemRequired,
    });
    
    setChecklist(newChecklist);
    setNewItemText("");
    setNewItemRequired(false);
  };
  
  const removeItem = (categoryId: string, itemId: string) => {
    const categoryIndex = checklist.findIndex(cat => cat.id === categoryId);
    if (categoryIndex === -1) return;
    
    const newItems = checklist[categoryIndex].items.filter(item => item.id !== itemId);
    const newChecklist = [...checklist];
    newChecklist[categoryIndex] = {
      ...checklist[categoryIndex],
      items: newItems,
    };
    
    setChecklist(newChecklist);
  };
  
  const removeCategory = (categoryId: string) => {
    setChecklist(checklist.filter(cat => cat.id !== categoryId));
  };
  
  const saveChecklist = () => {
    // In a real application, this would save the checklist to the backend
    console.log("Saving checklist:", checklist);
    alert("Checklist saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Offboarding Checklist</h3>
        <Button onClick={saveChecklist}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Label htmlFor="new-category">Add New Category</Label>
            <Input
              id="new-category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Enter category name"
            />
          </div>
          <Button onClick={addCategory}>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2 md:col-span-1">
            <Label htmlFor="new-item-text">New Item Text</Label>
            <Input
              id="new-item-text"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              placeholder="Enter item text"
            />
          </div>
          
          <div className="space-y-2 md:col-span-1">
            <Label htmlFor="new-item-category">Category</Label>
            <select
              id="new-item-category"
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Select category</option>
              {checklist.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="new-item-required"
                checked={newItemRequired}
                onCheckedChange={(checked) => 
                  setNewItemRequired(checked as boolean)
                }
              />
              <label
                htmlFor="new-item-required"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Required
              </label>
            </div>
            
            <Button onClick={addItem} className="ml-auto">
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="categories" type="category">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-6"
            >
              {checklist.map((category, categoryIndex) => (
                <Draggable
                  key={category.id}
                  draggableId={category.id}
                  index={categoryIndex}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="border rounded-lg p-4 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div
                          {...provided.dragHandleProps}
                          className="flex items-center gap-2"
                        >
                          <GripVertical className="h-5 w-5 text-muted-foreground" />
                          <h4 className="text-md font-semibold">{category.category}</h4>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeCategory(category.id)}
                          className="text-destructive"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Droppable droppableId={category.id} type="item">
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="space-y-2"
                          >
                            {category.items.map((item, itemIndex) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={itemIndex}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className="flex items-center justify-between border rounded-md p-2"
                                  >
                                    <div className="flex items-center gap-2">
                                      <div
                                        {...provided.dragHandleProps}
                                        className="cursor-grab"
                                      >
                                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                                      </div>
                                      <Checkbox
                                        id={`item-${item.id}`}
                                        checked={item.required}
                                        disabled
                                      />
                                      <label
                                        htmlFor={`item-${item.id}`}
                                        className="text-sm"
                                      >
                                        {item.text}
                                      </label>
                                      {item.required && (
                                        <Badge variant="outline" className="ml-2">
                                          Required
                                        </Badge>
                                      )}
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => removeItem(category.id, item.id)}
                                      className="text-destructive"
                                    >
                                      <Trash className="h-4 w-4" />
                                    </Button>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
