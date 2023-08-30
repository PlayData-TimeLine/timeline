import { Injectable, Inject } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { In, Repository, Not, MoreThan } from 'typeorm';
import { MembersService } from 'src/members/members.service';
import { Member } from 'src/members/entities/member.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { PostDto } from './dto/post.dto';
import { FriendsService } from 'src/friends/friends.service';

@Injectable()
export class PostsService {

  constructor(
    @Inject('POST_REPOSITORY')
    private postRepository: Repository<Post>,
    private readonly membersService: MembersService, private readonly friendService: FriendsService) { }

  // 게시글 작성
  post = async (id: number, createPostDto: CreatePostDto, imgPath: string) => {

    const member = new Member
    member.id = id
    const subject = new Subject
    subject.id = createPostDto.subjectNum

    const post = new PostDto(createPostDto).toEntity(member, subject, imgPath)
    return await this.postRepository.save(post);
  }

  findAllWithMember = async (uid: number) => {

    /*
    일단 내 친구들의 번호를 받아와야함.
    그 번호로 글을 찾는다 ..?  -> 쿼리를 여러번 날림, 근데 그리고 그 글을 셔플해야함.? 근데 이건 객체로 받아오는거 아니었나..?

    글을 한번 찾아온다음, 친구로 검사하기? 이건 NxM 정도의 연산이 필요함. 이게 싸게 먹히나? -> In 으로 찾아와버림 

    -> 대신 하루 미만의 글만 가져오기
    -> 페이지도 구현할 수 있으면 하기

    친구들의 글을 다 넣었으면, 그 글의 번호 리스트를 받아야함. 이건 맵으로 돌려서 받아오면 되긴함.

    그리고 일반 글들을 찾아와서 

    일단 친구글을 넣고, 일반 글을 넣은다음

    그 글을 맵으로 돌려서 내가 좋아요한 리스트의 글을 하트 트루로 반납해줘야함..


    */

    const postNumList = await this.findLikeWhat(uid) // 일단 이건 내가 좋아요한 리스트임.

    // const test = this.postRepository.find({
    //   where: {
    //     id: In(postNumList)
    //   }
    // }
    // )

    const friends = await this.friendService.findMyFriendNum(uid)

    const friendNum = friends.map((friend) => friend.to.id)

    //친구 글.. 
    const friendPost = await this.postRepository.find({
      relations: {
        member: true,
        subject: true,

      },
      select: {
        member: {
          id: true,
          nickName: true,
          profilePath: true
        },
      },
      where: {
        member: {
          id: In(friendNum)
        },
        // CreateAt:MoreThan(new Date()) // 여기에 지금으로부터 하루전 들어가야함 일단 주석 밑에도 마찬가지
      },
      order: {
        CreateAt: 'DESC'
      }

    })

    const posts = await this.postRepository.find({
      relations: {
        member: true,
        subject: true
      },
      select: {
        member: {
          id: true,
          nickName: true,
          profilePath: true
        },
      },
      where: {
        member: {
          id: Not(In(friendNum))
        }
      },
      order: {
        CreateAt: 'DESC'
      }
    })



    const postList: Post[] = [...friendPost, ...posts]

    const result = postList.map((post) => {
      if (postNumList.includes(post.id)) return { ...post, heart: true }
      else return { ...post, heart: false }
    })


    return result

  }

  //2번 4번
  findAllByMember = async (uId: number, mId: number) => { // 그 멤버가 쓴 모든 글을 작성시간순으로 다 가져오기.
    const mem = new Member
    mem.id = uId

    const posNum = await this.findLikeWhat(mId)  // 내가 좋아요 한 글 리스트

    const posts = await this.postRepository.find({
      relations: {
        member: true,
        subject: true
      },
      where: {
        member: mem
      },
      select: {
        member: {
          id: true,
          nickName: true,
          profilePath: true
        }
      },
      order: {
        CreateAt: {
          direction: 'DESC'
        }
      }
    })

    const result = posts.map((post) => {
      if (posNum.includes(post.id)) return { ...post, heart: true }
      else return { ...post, heart: false }
    })


    return result
  }
  // 아이디로 아무튼 하나 찾아오기. 쓰긴했음... 안써도될거같지만
  findOneById = async (id: number) => {
    return await this.postRepository.findOne({

      where: {
        id: id
      }
    })
  }
  //4번임 한 멤버의 포스트의 글을 보기
  findOne = async (tId: number, uId: number) => {

    const posNum = await this.findLikeWhat(uId) // 내가 좋아요한 포스트 리스트

    const post = await this.postRepository.findOne({
      relations: {
        member: true,
        subject: true,
        comment: true
      },
      select: {
        member: {
          id: true,
          nickName: true,
          profilePath: true
        },
        subject: {
          name: true
        },

        comment: {
          comment: true,
          member: {
            id: true,
            nickName: true,
            profilePath: true
          }
        }
      },
      where: {
        id: tId
      }
    });

    if (posNum.includes(post.id)) return { ...post, heart: true }
    else return { ...post, heart: false }
  }
  // 그 멤버가 쓴 모든 글을 settime으로 다 가져오기.
  findAllByMemberForTimeline = async (uId: number, mId: number) => {
    // const mem = new Member
    // mem.id = uId


    const posNum = await this.findLikeWhat(mId)  // 내가 좋아요 한 글 리스트

    const posts = await this.postRepository.find({
      relations: {
        member: true,
        subject: true
      },
      where: {
        member: {
          id: uId
        }
      },
      select: {
        member: {
          id: true,
          nickName: true,
          profilePath: true
        }
      },
      order: {
        setDate: {
          direction: 'ASC'
        }
      }
    })

    const result = posts.map((post) => {
      if (posNum.includes(post.id)) return { ...post, heart: true }
      else return { ...post, heart: false }
    })


    return result

  }
  // 6번 .. 상대방의 특정 주제의 글을 가져오기 시간순으로
  findBySubjectWithMemberOfTimeline = async (uId: number, sId: number): Promise<Post[]> => {
    // const mem = new Member
    // mem.id = uId

    // const sub = new Subject
    // sub.id = sId

    return await this.postRepository.find({

      relations: {
        member: true

      },
      where: {
        subject: {
          id: sId
        },
        member: {
          id: uId
        }
      },
      select: {
        member: {
          id: true,
          nickName: true,
          profilePath: true
        }
      },
      order: {
        setDate: {
          direction: 'ASC'
        }
      }
    })
  }




  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  updateWithPost = async (id: number, post: Post) => {
    return this.postRepository.update(id, post)
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }




  // 내가 좋아요한 게시글의 넘버 리스트 받아오기
  private findLikeWhat = async (uid: number) => {

    const list = await this.postRepository.find({
      relations: {
        heart: true
      },
      where: {
        heart: {
          member: {
            id: uid
          }
        }
      }
    })

    const Numlist = list.map((post) => post.id)

    return Numlist

  }
}
