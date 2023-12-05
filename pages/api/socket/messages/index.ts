import { NextApiRequest } from "next";

import { NextApiResponseServerIo } from "@/types";
import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const profile = await currentProfilePages(req);
    const { content, fileUrl } = req.body;
    const { serverId, channelId } = req.query;
    
    if (!profile) {
      return res.status(401).json({ error: "Não autorizado" });
    }    
  
    if (!serverId) {
      return res.status(400).json({ error: "ID do servidor ausente" });
    }
      
    if (!channelId) {
      return res.status(400).json({ error: "ID do canal ausente" });
    }
          
    if (!content) {
      return res.status(400).json({ error: "Conteúdo ausente" });
    }

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profile.id
          }
        }
      },
      include: {
        members: true,
      },
      cacheStrategy: { ttl: 60 }
    });

    if (!server) {
      return res.status(404).json({ message: "Servidor não encontrado" });
    }

    const channel = await db.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string,
      },
      cacheStrategy: { ttl: 60 }
    });

    if (!channel) {
      return res.status(404).json({ message: "Canal não encontrado" });
    }

    const member = server.members.find((member: any) => member.profileId === profile.id);

    if (!member) {
      return res.status(404).json({ message: "Membro não encontrado" });
    }

    const message = await db.message.create({
      data: {
        content,
        fileUrl,
        channelId: channelId as string,
        memberId: member.id,
      },
      include: {
        member: {
          include: {
            profile: true,
          }
        }
      }
    });

    const channelKey = `chat:${channelId}:messages`;

    res?.socket?.server?.io?.emit(channelKey, message);

    return res.status(200).json(message);
  } catch (error) {
    console.log("[MESSAGES_POST]", error);
    return res.status(500).json({ message: "Erro interno" }); 
  }
}