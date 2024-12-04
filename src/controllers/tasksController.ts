import {prisma} from "../database";

export const createTask = async (req: any, res: any) => {
  try {
    const { title, description, priority, userId } = req.body;

    if (!title || !description || !priority) {
      throw new Error("All fields are required")
    }

    const task = await prisma.task.create({
      data: {title, description, priority, userId}
    })

    res.status(200).json({status: 'success', message: 'task created with success!', task})
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({status: 'error', message: error.message });
  }
};

export const getTasks = async (req: any, res:any) => {
  try {
    const tasks = await prisma.task.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        priority: true,
        status: true
      }
    });

    res.status(200).json({
      status: 'success',
      tasks
    })
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({status: 'error', message: error.message})
  }
}

export const getTaskById = async (req: any, res:any) => {
  try {
    const {id} = req.params;
    const task = await prisma.task.findUnique({
      where: {id},
      select: {
        id: true,
        title: true,
        description: true,
        priority: true,
        status: true
      }
    })

    if (!task) {
      throw new Error("Task doesn't exist")
    }

    res.status(200).json({status: 'success', task})
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({status: 'error', message: error.message})
  }
}

export const updateTask = async (req: any, res: any) => {
  try {
    const {id} = req.params;
    const {title, description, priority, status} = req.body;

    let task = await prisma.task.findUnique({
      where: {id}
    })

    if (!task) {
      throw new Error('No task was founded')
    }

    task = await prisma.task.update({
      where: {id},
      data: {title, description, priority, status}
    })

    res.status(200).json({
      status: 'success',
      message: 'Task updated successfully',
      task
    })
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({status: 'error', message: error.message})
  }
}

export const deleteTask = async (req: any, res: any) => {
  try {
    const {id} = req.body

    const task = await prisma.task.findUnique({
      where: {id}
    })

    if (!task) {
      throw new Error('No task was founded')
    }

    await prisma.task.delete({
      where: {id}
    })

    res.status(200).json({
      status: 'success',
      message: 'Task was deleted successfully'
    })
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({status: 'error', message: error.message})
  }
}