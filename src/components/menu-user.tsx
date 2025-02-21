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

const MenuItem = ({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  onClick: () => void
}) => (
  <li>
    <button
      className="w-full flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-blue-400 transition-colors"
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  </li>
)

const ConfirmationModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  isLoading,
}: {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  isLoading: boolean
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg max-w-sm">
        <h3 className="text-lg font-bold text-teal-400 mb-4">{title}</h3>
        <p className="text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  )
}

const UserChangeModal = ({
  isOpen,
  onClose,
  onSubmit,
  form,
  isLoading,
  messageError,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  form: any
  isLoading: boolean
  messageError: Error | null
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg max-w-sm">
        <h3 className="text-lg font-bold text-teal-400 mb-4">
          Change Username
        </h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              {...form.register('name')}
              placeholder="New Username"
              className="w-full p-2 bg-[#242424] rounded focus:ring-2 focus:ring-teal-500 outline-none"
              aria-invalid={!!form.formState.errors.name}
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              {...form.register('password')}
              placeholder="Password"
              className="w-full p-2 bg-[#242424] rounded focus:ring-2 focus:ring-teal-500 outline-none"
              aria-invalid={!!form.formState.errors.password}
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.password.message}
              </p>
            )}
            {messageError && (
              <p className="text-red-500 text-sm mt-1">
                {messageError.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const PasswordChangeModal = ({
  isOpen,
  onClose,
  onSubmit,
  form,
  isLoading,
  messageError,
}: {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
  form: any
  isLoading: boolean
  messageError: Error | null
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg max-w-sm">
        <h3 className="text-lg font-bold text-teal-400 mb-4">
          Change Password
        </h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              {...form.register('oldPassword')}
              placeholder="Current Password"
              className="w-full p-2 bg-[#242424] rounded focus:ring-2 focus:ring-teal-500 outline-none"
              aria-invalid={!!form.formState.errors.oldPassword}
            />
            {form.formState.errors.oldPassword && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.oldPassword.message}
              </p>
            )}
          </div>
          {messageError && (
            <p className="text-red-500 text-sm mt-1">{messageError.message}</p>
          )}
          <div>
            <input
              type="password"
              {...form.register('newPassword')}
              placeholder="New Password"
              className="w-full p-2 bg-[#242424] rounded focus:ring-2 focus:ring-teal-500 outline-none"
              aria-invalid={!!form.formState.errors.newPassword}
            />
            {form.formState.errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.newPassword.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              {...form.register('newPasswordConfirm')}
              placeholder="Confirm New Password"
              className="w-full p-2 bg-[#242424] rounded focus:ring-2 focus:ring-teal-500 outline-none"
              aria-invalid={!!form.formState.errors.newPasswordConfirm}
            />
            {form.formState.errors.newPasswordConfirm && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.newPasswordConfirm.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
