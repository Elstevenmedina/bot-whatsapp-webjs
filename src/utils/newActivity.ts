import HistoryActivityModel from '../models/historyActivity'
import { getFullDate } from '../moment'
import { type HistoryActivity } from '../interfaces/historyActivity'

export const newActivity = async (user: string, _idUser: string, systemSection: string, action: string): Promise<HistoryActivity> => {
  const fullDate = getFullDate()

  const newHistoryActivity = new HistoryActivityModel({
    Fecha: fullDate,
    Timestamp: Date.now(),
    Usuario: user,
    _idUsuario: _idUser,
    SeccionSistema: systemSection,
    Accion: action
  })

  return await newHistoryActivity.save()
}
