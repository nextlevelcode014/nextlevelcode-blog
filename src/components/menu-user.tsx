'use client'

import { useAuth } from '@/context/auth-context'
import { deleteUser, updateUsername, updateUserPassword } from '@/services/api'
import { changePasswordSchema, changeUsernameSchema } from '@/services/schemas'
import { UsernameUpdate, UserPasswordUpdate } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FaKey, FaSignOutAlt, FaUserCircle, FaUserEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { ConfirmationModal } from './confirmation-modal'
import { UserChangeModal } from './user-change-modal'
import { PasswordChangeModal } from './password-change-modal'
import { MenuItem } from './menu-item'

export default function UserMenu() {
  const { isAuthenticated, logout, query } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeModal, setActiveModal] = useState<
    'delete' | 'password' | 'username' | 'logout' | null
  >(null)
  const user = query.data
  const menuRef = useRef<HTMLDivElement>(null)

  const usernameForm = useForm<UsernameUpdate>({
    resolver: zodResolver(changeUsernameSchema),
    mode: 'onChange',
  })

  const passwordForm = useForm<UserPasswordUpdate>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
  })

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      query.refetch()
      logout()
    },
  })

  const usernameMutation = useMutation({
    mutationFn: updateUsername,
    onSuccess: () => {
      setActiveModal(null)
      query.refetch()
      usernameForm.reset()
    },
  })

  const passwordMutation = useMutation({
    mutationFn: updateUserPassword,
    onSuccess: () => {
      setActiveModal(null)
      query.refetch()
      passwordForm.reset()
    },
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleConfirmAction = () => {
    if (activeModal === 'delete' && user?.data.user.id) {
      deleteMutation.mutate(user.data.user.id)
    }
  }

  const handleUsernameSubmit = (data: UsernameUpdate) => {
    usernameMutation.mutate(data)
  }

  const handlePasswordSubmit = (data: UserPasswordUpdate) => {
    passwordMutation.mutate(data)
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        aria-label="User menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors"
      >
        <FaUserCircle className="w-6 h-6" />
        {user?.data.user.name}
      </button>

      {isMenuOpen && isAuthenticated && (
        <div className="absolute right-0 mt-2 w-52 bg-[#242424] rounded-lg shadow-lg z-50">
          <ul className="py-2">
            <MenuItem
              icon={<FaSignOutAlt />}
              label="Logout"
              onClick={() => setActiveModal('logout')}
            />
            <MenuItem
              icon={<MdDelete />}
              label="Delete Account"
              onClick={() => setActiveModal('delete')}
            />
            <MenuItem
              icon={<FaKey />}
              label="Change Password"
              onClick={() => setActiveModal('password')}
            />
            <MenuItem
              icon={<FaUserEdit />}
              label="Change Username"
              onClick={() => setActiveModal('username')}
            />
          </ul>
        </div>
      )}

      <ConfirmationModal
        isOpen={activeModal === 'delete' || activeModal === 'logout'}
        title={activeModal === 'delete' ? 'Delete Account' : 'Confirm Logout'}
        message={
          activeModal === 'delete'
            ? 'Are you sure you want to permanently delete your account? This action cannot be undone.'
            : 'Are you sure you want to logout?'
        }
        onConfirm={activeModal === 'delete' ? handleConfirmAction : logout}
        onCancel={() => setActiveModal(null)}
        isLoading={deleteMutation.isPending}
      />
      <UserChangeModal
        isOpen={activeModal === 'username'}
        onClose={() => setActiveModal(null)}
        onSubmit={usernameForm.handleSubmit(handleUsernameSubmit)}
        form={usernameForm}
        isLoading={usernameMutation.isPending}
        messageError={usernameMutation.error}
      />

      <PasswordChangeModal
        isOpen={activeModal === 'password'}
        onClose={() => setActiveModal(null)}
        onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)}
        form={passwordForm}
        isLoading={passwordMutation.isPending}
        messageError={passwordMutation.error}
      />
    </div>
  )
}
