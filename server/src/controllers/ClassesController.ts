import { Request, Response } from 'express';

import db from '../database/connection';

import convertHourToMinutes from '../utils/convertHourToMinutes';

interface IScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  
  async index(req: Request, res: Response) {
    const {week_day, subject, time} = req.query;

    if (!week_day || !subject || !time) {
      return res.status(400).json({
        error: 'Missing filters to search classes'
      });
    }

    const timeInMinutes = convertHourToMinutes(time as string);

    const classes = await db.table('classes')
      .distinct()
      .join('users', 'classes.user_id', '=', 'users.id')
      .join('class_schedule', 'classes.id', '=', 'class_schedule.class_id')
      .where('classes.subject', '=', subject as string)
      .andWhere('class_schedule.week_day', '=', week_day as string )
      .andWhere('class_schedule.from', '<=', timeInMinutes )
      .andWhere('class_schedule.to', '>=', timeInMinutes )
      .select(['classes.*', 'users.*', 'class_schedule.*']);
    
      res.status(200).json(classes);

  };

  async create(req: Request, res: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = req.body;
  
    const trx = await db.transaction();
  
    try {
      const insertedUsersIds = await trx.table('users').insert({
        name,
        avatar,
        whatsapp,
        bio
      });
    
      const user_id = insertedUsersIds[0];
    
      const insertedClassesIds = await trx.table('classes').insert({
        subject,
        cost,
        user_id
      });
    
      const class_id = insertedClassesIds[0];
    
      const classSchedule = schedule.map((scheduleItem: IScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to)
        };
      });
    
      await trx.table('class_schedule').insert(classSchedule);
    
      await trx.commit();
    
      return res.status(201).send();
  
    } catch(e) {
      trx.rollback();
  
      return res.status(400).json({
        error: 'Unexpected error while creating new class.',
        details: e
      });
    }
  };

}
