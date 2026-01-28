import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupInvoiceShare } from './group-invoice-share.entities';

@Entity({ name: 'group_invoice_share_items' })
export class GroupInvoiceShareItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid', { name: 'share_id' })
    shareId: string;

    @ManyToOne(() => GroupInvoiceShare, (s) => s.items, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'share_id' })
    share: GroupInvoiceShare;

    @Column('varchar', { name: 'item_name', length: 160 })
    itemName: string;

    @Column('numeric', { precision: 14, scale: 2 })
    amount: string;
}
